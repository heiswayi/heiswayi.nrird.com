---
layout: post
title: Containerized LAMP stack deployment with nginx
description: This is how I configure my EC2 instance to work with multiple DNS and proxify the traffic through nginx to respective services that are running in Docker containers.
tags: [nginx, Cloud Computing, EC2, Docker, DNS]
---

### Overview

Following diagram is to illustrate on how I configure a **single virtual server** to work with **multiple subdomains** that are proxified to **their respective services** via [nginx](https://nginx.org/en/);

{% include figure.html src="assets/images/hOHgcpY.png" caption="Proxify with nginx" %}

> A "service" here is referred to an application that is running from inside a Docker container.



### Virtual Server

The virtual server that I use here is an [Amazon EC2 instance](https://aws.amazon.com/ec2/) from [AWS](https://aws.amazon.com/). EC2 is easy to be scaled to the changing needs of the cloud computing.

The firewall solution in Amazon EC2 is called a [**Security Group**](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html) which is used to filter incoming and outgoing traffic from an EC2 instance.

{% include figure.html src="assets/images/RLjzLnQ.png" caption="Example of incoming traffic configurations in a security group" %}

If you're looking for a cheaper, lightweight or more simplified version of a server instance, there is a service called [Lightsail](https://aws.amazon.com/lightsail/).



### DNS Management

I use a free [Cloudflare Managed DNS](https://www.cloudflare.com/en-au/dns/) service to manage my primary domain's DNS.

> "Cloudflare Managed DNS is an enterprise-grade authoritative DNS service that offers the fastest response time, unparalleled redundancy, and advanced security with built-in DDoS mitigation and DNSSEC."

Cloudflare Managed DNS has a simple and intuitive UI. Other than DNS, Cloudflare also has a lot of other great goodies for free that I can benefit.

Following are the example of DNS records;

| **Type** | **Name** | **Content** | **Proxy status** |
| A | `a.nrird.com` | `EC2_Instance_IP` | Yes |
| A | `b.nrird.com` | `EC2_Instance_IP` | Yes |
| A | `c.nrird.com` | `EC2_Instance_IP` | Yes |

> `EC2_Instance_IP` is the [Elastic IP](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html) of my EC2 instance.

I enabled the DNS to be proxified by Cloudflare so I can get the benefit of Cloudflare Free Universal SSL certififcate that has automatic renewal.



### nginx

nginx is used as an entry point to the EC2 instance and also works as a load balancer that will proxify the incoming traffic to the respective services.

Following diagram is to illustrate on how the traffic is routed from Cloudflare DNS to a particular service;

{% include figure.html src="assets/images/93u5aeP.png" caption="Example of traffic routes" %}

#### nginx.conf

Here's the example of nginx configurations for the `server` block that I have modified from the default `nginx.conf` file;

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



### LAMP stack

I have a LAMP stack deployed into a EC2 instance using isolated [Docker containers](https://www.docker.com/resources/what-container) and then proxified by nginx as I mentioned above. This LAMP server is mostly used to host some of apps/scripts that are written in PHP.

> LAMP is stand for [Linux](https://en.wikipedia.org/wiki/Linux), [Apache](https://httpd.apache.org/), [MySQL](https://dev.mysql.com/downloads/mysql/5.7.html) and [PHP](https://www.php.net/). LAMP stack is quite common for a web server especially for PHP applications.

#### Advantages of running LAMP stack in Docker containers

Following are the advantages of running the LAMP stack in containers;

| 1. | The LAMP deployment won't mess up with my system and keep my system clean if anything goes wrong with a particular service. I can just delete everything and start again. |
| 2. | It keeps my system and other services secure if a particular service is compromised or getting hacked. |
| 3. | Managing app version updates is easier as I can rebuild the Docker images and recreate the containers.|
| 4. | Most of the configurations can be done within a single _docker-compose.yml_ file. |
| 5. | I can easily control the container ports accessibility and port mappings. |

#### Source code

If you're interested, I have made my LAMP deployment configurations available on [GitHub](https://github.com/heiswayi/lamp-stack).