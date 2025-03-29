# Node.js Fetch メモリリーク再現リポジトリ

このリポジトリは、Node.jsのFetch APIを使用した際のメモリリークを再現するためのサンプルコードです。

## セットアップ

1. 依存パッケージをインストールします。

```bash
npm install
```

2. メモリリークを再現するためのデータを生成します。

```bash
npm run gen-data
```

3. モックサーバーを起動します。

```bash
npm run mock-server
```

4. メモリリークを再現します。

別ターミナルで実行します。

```bash
npm run dev
```

次のような結果が得られる
```
START
rss: 80 MB, heapTotal: 12 MB, heapUsed: 8 MB, external: 2 MB, arrayBuffers: 0 MB
PROGRESS
rss: 85 MB, heapTotal: 11 MB, heapUsed: 11 MB, external: 3 MB, arrayBuffers: 0 MB
PROGRESS
rss: 1463 MB, heapTotal: 48 MB, heapUsed: 14 MB, external: 1353 MB, arrayBuffers: 1349 MB
PROGRESS
rss: 854 MB, heapTotal: 52 MB, heapUsed: 19 MB, external: 2548 MB, arrayBuffers: 2544 MB
PROGRESS
rss: 1910 MB, heapTotal: 57 MB, heapUsed: 22 MB, external: 3837 MB, arrayBuffers: 3824 MB
PROGRESS
rss: 2617 MB, heapTotal: 62 MB, heapUsed: 27 MB, external: 5046 MB, arrayBuffers: 5043 MB
Status: 200
Chunk: Uint8Array(2) [ 79, 75 ]
Garbage collection is executed
END
rss: 93 MB, heapTotal: 62 MB, heapUsed: 25 MB, external: 5046 MB, arrayBuffers: 5022 MB
```

ここで、external, arrayBuffersがどんどん増えていくことがわかる。
これは、Bufferのメモリリークが発生していることを示唆する。