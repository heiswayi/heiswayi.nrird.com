---
layout: post
title: Containerized LAMP stack deployment with Nginx
description: This is how I configured my EC2 instance to work with multiple DNS and proxify the traffic through Nginx to respective services that were running in Docker containers.
tags: [nginx, cloud-computing, ec2, docker, dns, programming]
---

One of my use cases involves deploying a LAMP stack on a virtual server. However, this server will also host other services. To manage this, I'll set up the following configuration as shown in the image below:

![Proxify with Nginx](/assets/post-images/nginx1.png)

First, I'll containerize the LAMP stack, along with the other services, so they can all run concurrently using Docker containers. Then, I'll use Nginx to route traffic from specific domains to their respective containers.

## Virtual Server

I will utilize an EC2 instance from AWS as the virtual server. EC2 offers scalability to accommodate evolving cloud computing requirements. To manage inbound and outbound traffic to the EC2 instance, I use a firewall solution known as a Security Group.

![Example of incoming traffic configurations in a security group](/assets/post-images/nginx2.png)

## DNS Management

[Cloudflare Managed DNS](https://www.cloudflare.com/en-au/dns/) is used to handle the primary domain's DNS management. This enterprise-grade service provides fast response times and advanced security features, including DDoS mitigation and DNSSEC. Subdomain DNS records are configured to route through Cloudflare, taking advantage of free Universal SSL certificates with automatic renewal.

Example of DNS records configured:

| **Type** | **Name** | **Content** | **Proxy status** |
|---|---|---|---|
| A | `a.nrird.com` | `EC2_Instance_Public_IP_Address` | Yes |
| A | `b.nrird.com` | `EC2_Instance_Public_IP_Address` | Yes |
| A | `c.nrird.com` | `EC2_Instance_Public_IP_Address` | Yes |

## Nginx

Nginx functions as both the entry point to the EC2 instance and a load balancer, directing traffic to the appropriate services running in Docker containers. The Nginx configuration includes server blocks for each subdomain.

![Example of traffic routes](/assets/post-images/nginx3.png)

### Here's the nginx.conf file that I configured for my setup

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

A LAMP stack, consisting of [Linux](https://en.wikipedia.org/wiki/Linux), [Apache](https://httpd.apache.org/), [MySQL](https://dev.mysql.com/downloads/mysql/5.7.html), and [PHP](https://www.php.net/), is deployed in [Docker containers](https://www.docker.com/resources/what-container) on an EC2 instance. Nginx is used to proxy traffic to these containers. Running the LAMP stack in containers offers several benefits, including maintaining system cleanliness, enhancing security, facilitating easier application updates, simplifying configuration management with a single `docker-compose.yml` file, and improving control over port accessibility.

If you're interested, you can find my LAMP deployment configurations on [GitHub](https://github.com/heiswayi/lamp-stack).