#!/bin/bash

# ddコマンドで乱数ファイルを作成
dd if=/dev/urandom of=./100mb.bin bs=1M count=100
dd if=/dev/urandom of=./200mb.bin bs=2M count=100
dd if=/dev/urandom of=./1gb.bin bs=10M count=100
dd if=/dev/urandom of=./5gb.bin bs=50M count=100
