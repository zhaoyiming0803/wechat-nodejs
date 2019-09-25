#!/usr/bin/env bash

# publish
tar -czvf wechat.tar.gz .

mkdir -p /work/api/wechat
rm -rf /work/api/wechat/*
cp wechat.tar.gz /work/api/wechat
cd /work/api/wechat && tar -xvf wechat.tar.gz && npm --registry=https://registry.npm.taobao.org install && pm2 stop pm2.json && pm2 restart pm2.json
