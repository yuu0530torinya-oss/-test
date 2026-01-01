# Wealth Dynamics 8プロファイル診断（簡易版）

React + Tailwind CDNで動くシングルページの診断ツールです。12問に回答すると、8つのプロファイルから上位2タイプと強みの出し方を提示します。

## 表示方法

依存関係のインストールは不要です。ローカルでHTTPサーバーを立ててアクセスしてください（React/Babel/TailwindはCDN経由で読み込みます）。

```bash
python -m http.server 8000
```

ブラウザで http://localhost:8000 を開くと、診断ツールが表示されます。
