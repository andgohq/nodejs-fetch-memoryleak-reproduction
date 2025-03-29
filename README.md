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
