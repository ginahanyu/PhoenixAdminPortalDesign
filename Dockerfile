# 使用最新的 Nginx Alpine 镜像
FROM nginx:alpine

# 复制 nginx 配置文件
ADD nginx.conf /etc/nginx/conf.d/default.conf

# 复制本地已构建好的文件到 nginx 目录
ADD ./build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]