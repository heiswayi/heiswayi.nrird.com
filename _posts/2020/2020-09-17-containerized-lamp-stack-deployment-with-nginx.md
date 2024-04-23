---
layout: post
title: Containerized LAMP stack deployment with Nginx
description: This is how I configure my EC2 instance to work with multiple DNS and proxify the traffic through Nginx to respective services that are running in Docker containers.
tags: [nginx, cloud-computing, ec2, docker, dns]
---

## Overview

Configuring a single virtual server to handle multiple subdomains involves several key components, including the choice of a virtual server, DNS management, the use of nginx as a proxy, and the deployment of a LAMP stack. In this illustration, I detail the setup process using an Amazon EC2 instance, Cloudflare Managed DNS, nginx, and Docker containers (represented as "Service_*").

![Proxify with Nginx](/assets/post-images/nginx1.png)

## Virtual Server

For this configuration, an Amazon EC2 instance from AWS serves as the virtual server. EC2 provides scalability to meet changing cloud computing needs. The firewall solution, known as a Security Group, manages incoming and outgoing traffic to the EC2 instance.

![Example of incoming traffic configurations in a security group](/assets/post-images/nginx2.png)

For those seeking a more cost-effective and streamlined server instance, AWS offers a service called [Lightsail](https://aws.amazon.com/lightsail/).

## DNS Management

[Cloudflare Managed DNS](https://www.cloudflare.com/en-au/dns/) is utilized to manage the primary domain's DNS. This enterprise-grade service not only offers fast response times but also includes advanced security features such as DDoS mitigation and DNSSEC. The DNS records for subdomains are configured to proxy through Cloudflare for the benefits of free Universal SSL certificates with automatic renewal.

Example DNS records:

| **Type** | **Name** | **Content** | **Proxy status** |
| A | `a.nrird.com` | `EC2_Instance_IP` | Yes |
| A | `b.nrird.com` | `EC2_Instance_IP` | Yes |
| A | `c.nrird.com` | `EC2_Instance_IP` | Yes |

## Nginx

nginx serves as both an entry point to the EC2 instance and a load balancer, directing traffic to the respective services running in Docker containers. The nginx configuration includes server blocks for each subdomain.

![Example of traffic routes](/assets/post-images/nginx3.png)

### nginx.conf

The nginx configuration in the `nginx.conf` file includes settings such as worker processes, error logging, and server blocks for each subdomain. Each block specifies the proxy settings for routing traffic to the corresponding Docker container.

```nginx
user              nginx;
worker_processes  auto;
error_log         /var/log/nginx/error.log;
pid               /run/nginx.pid;
include           /usr/share/nginx/modules/*.conf;
events {
    worker_connections 1024;
}
http {
    server_names_hash_bucket_size  128;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log          /var/log/nginx/access.log  main;
    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 4096;
    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    include             /etc/nginx/conf.d/*.conf;

    server {
         listen       80;
         server_name  a.nrird.com;
         index        index.html index.htm index.php;
         location / {
             proxy_set_header  X-Real-IP        $remote_addr;
             proxy_set_header  Host             $http_host;
             proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
             proxy_set_header  X-NginX-Proxy    true;
             proxy_pass        http://127.0.0.1:8080;
             proxy_redirect    off;
             break;
         }
    }
    server {
         listen       80;
         server_name  b.nrird.com;
         index        index.html index.htm index.php;
         location / {
             proxy_set_header  X-Real-IP        $remote_addr;
             proxy_set_header  Host             $http_host;
             proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
             proxy_set_header  X-NginX-Proxy    true;
             proxy_pass        http://127.0.0.1:8181;
             proxy_redirect    off;
             break;
         }
    }
    server {
         listen       80;
         server_name  c.nrird.com;
         index        index.html index.htm index.php;
         location / {
             proxy_set_header  X-Real-IP        $remote_addr;
             proxy_set_header  Host             $http_host;
             proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
             proxy_set_header  X-NginX-Proxy    true;
             proxy_pass        http://127.0.0.1:8282;
             proxy_redirect    off;
             break;
         }
    }

}
```

## LAMP stack

A LAMP stack, comprising [Linux](https://en.wikipedia.org/wiki/Linux), [Apache](https://httpd.apache.org/), [MySQL](https://dev.mysql.com/downloads/mysql/5.7.html), and [PHP](https://www.php.net/), is deployed within [Docker containers](https://www.docker.com/resources/what-container) on the EC2 instance. nginx is used to proxy traffic to these containers. The advantages of running the LAMP stack in containers include maintaining system cleanliness, enhanced security, easier app version updates, simplified configuration management through a single `docker-compose.yml` file, and improved control over port accessibility.

For those interested, my LAMP deployment configurations are available on [GitHub](https://github.com/heiswayi/lamp-stack).