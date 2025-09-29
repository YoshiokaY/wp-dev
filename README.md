# WordPress Development Environment

様々なタスクランナーと統合可能なWordPressのDocker開発環境です。
WordPressの初期設定やプラグインのインストール、固定ページの作成を自動化。
好きなタスクランナーと組み合わせて静的構築からWordPress実装を効率的に行えます。

## 🚀 特徴

- **Docker環境**: PHP 8.3 + MySQL + WordPress + WP-CLI
- **静的ファイル統合**: HTMLファイルから自動でWordPressページ作成
- **セキュア設定**: REST API保護、コメント無効化、Gutenberg無効化
- **柔軟な構成**: 各種タスクランナーと組み合わせ可能

## 📋 必要な環境

- Node.js >= 18.0.0
- npm >= 8.0.0
- Docker & Docker Compose

## 🛠️ セットアップ

### 1. 環境変数設定

`.env`ファイルを作成し、以下の設定を行ってください：

```bash
# WordPress設定
WORDPRESS_DB_NAME=wordpress
WORDPRESS_DB_USER=wpuser
WORDPRESS_DB_PASSWORD=wppassword
WORDPRESS_DB_HOST=db:3306

# WordPress管理者設定
WORDPRESS_ADMIN_USER=site@admin
WORDPRESS_ADMIN_PASSWORD=fM4@o0dKceZP
WORDPRESS_ADMIN_EMAIL=admin@example.com

# サイト設定
SITE_URL=http://localhost:8080
SITE_NAME=WordPress Development

# テーマ設定
VITE_THEME_NAME=my-theme
THEME_PATH=htdocs/wp/wp-content/themes
STATIC_OUTPUT_DIR=htdocs
```

### 2. 新規環境構築

```bash
# 新しいWordPress環境を構築
npm run setup:new
```

### 3. 既存環境復元

```bash
# 既存データから環境を復元
npm run setup:restore
```

### Makefileコマンド

```bash
# データベースをダンプ（バックアップ作成）
make dump

# データベースをリストア（バックアップから復元）
make restore
```

### クリーンアップ

```bash
# キャッシュとビルドファイル削除
npm run clean

# 全データ削除（注意：データベースも含む）
npm run destroy
```

## 🏗️ プロジェクト構成

```
wp-dev/
├── docker/                    # Docker設定
│   ├── php/                   # PHP + Apache設定
│   │   └── Dockerfile
│   └── wpcli/                 # WordPress CLI設定
│       └── setup-wordpress.sh
├── src/                       # ソースファイル（仮）
│   └── wp/
│       └── wp-content/
│           └── themes/
│               └── my-theme/  # サンプルテーマ
│                   ├── functions.php
│                   ├── style.css
│                   └── index.php
├── htdocs/                    # 出力ディレクトリ（仮）
├── docker-compose.yml         # Docker構成
├── package.json               # NPM設定（マージ先のタスクランナーと統合してください）
└── .env                       # 環境変数
```

## 🎨 WordPressサンプルテーマ機能

### セキュリティ機能

- REST APIユーザーエンドポイント無効化
- コメント機能完全無効化
- pingback/trackback無効化
- 管理画面の不要な通知削除

### エディター設定

- Gutenbergエディター無効化
- Classic Editor使用
- ブロックエディター関連CSS削除

### 開発者向け機能

- デバッグモード有効
- Query Monitor対応
- 現在のテンプレート表示
- カスタムフィールド対応

## 🔧 各種タスクランナーとの統合

### Astro との連携

```javascript
// astro.config.mjs
export default defineConfig({
  outDir: './htdocs',
  // その他の設定...
});
```

### Vite との連携

```javascript
// vite.config.js
export default defineConfig({
  build: {
    outDir: './htdocs',
  },
  // その他の設定...
});
```

### Webpack との連携

nadia web starter kitに統合する場合、以下の設定を変更してください：

```javascript
// webpack.config.js
module.exports = {
  // ... 他の設定（entry, module, optimization等）は省略 ...

  output: {
    // アセットファイルの出力先をWordPressテーマディレクトリに変更
    assetModuleFilename: (assetInfo) => {
      return path.join("wp/wp-content/themes/my-theme/", assetInfo.filename.replace(/^(src\/)/, ""));
    },
    // ... 他のoutput設定は省略 ...
  },
  plugins: [
    // ... 他のプラグイン設定は省略 ...

    new HtmlBundlerPlugin({
      entry: "src/views/pages",
      js: {
        // JSファイルの出力先をWordPressテーマディレクトリに変更
        filename: "wp/wp-content/themes/my-theme/assets/js/[name].js",
      },
      css: {
        // CSSファイルの出力先をWordPressテーマディレクトリに変更
        filename: "wp/wp-content/themes/my-theme/assets/css/app.css",
      },
      preprocessor: preprocessor,
    }),

    // ... 他のプラグイン設定は省略 ...
  ],
  devServer: {
    devMiddleware: {
      // 開発サーバーでファイルをディスクに書き込み
      writeToDisk: true,
    },
    // WordPressプロキシ設定
    proxy: [
      {
        context: ['/wp'],
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    ],
    // ... 他のdevServer設定は省略 ...
  },
};
```

**変更点：**
- `writeToDisk: true` - 開発時にもファイルをディスクに書き込み
- `assetModuleFilename` - アセットファイルをWordPressテーマディレクトリに出力
- JSとCSSの`filename` - WordPressテーマディレクトリに出力
- `proxy` - WordPressへのプロキシ設定を追加してホットリロードさせる

## 📱 アクセス情報

開発環境起動後、以下のURLでアクセスできます：

- **フロントエンド**: http://localhost:8080
- **WordPress管理画面**: http://localhost:8080/wp/wp-admin

## 🐛 デバッグ

### WordPressデバッグ

- デバッグログ: `htdocs/wp-content/debug.log`
- Query Monitor: 管理画面で有効化済み

### Docker ログ確認

```bash
# 全サービスのログ
docker-compose logs -f

# 特定サービスのログ
docker-compose logs -f wordpress
docker-compose logs -f db
```

## 📖 静的ページ自動生成

`src/`ディレクトリ内の静的HTMLファイルから、自動でWordPressページを生成します：

1. `src/about/index.html` → WordPressページ「会社概要」（スラッグ: about）
2. `src/contact/index.html` → WordPressページ「お問い合わせ」（スラッグ: contact）

HTMLの`<h1>`タグの内容がページタイトルとして使用されます。

## 🔄 開発ワークフロー

1. **静的サイト開発**: `src/`で通常の開発(好きなタスクランナーと組み合わせてください)
2. **テーマのマウントディレクトリを指定**: `.env`でテーマディレクトリを設定しましす。デフォルトだと`htdocs/wp/wp-content/themes`。エラーが起きないようにサンプルテーマを用意していますが、普段使っているものでも構いません。
3. **静的htmlの出力先を指定**: `.env`で静的htmlがあるディレクトリを設定します。デフォルトだと`htdocs/wp/wp-content/themes`。配下のhtmlファイルを読み取ってWP初回セットアップ時に自動で固定ページを作成します。（ない場合は三つ作成します）
4. **WordPress初回セットアップ**: `npm run setup:new`でWordPressのインストール、初期設定、プラグインのインストール、固定ページの作成が自動実行されます。
5. **WordPress確認**: http://localhost:8080 でWordPress環境確認
6. **テーマ調整**: `src/wp/wp-content/themes/my-theme/`でテーマ調整

## ⚠️ 注意事項

- `npm run destroy`は全データを削除するため、実行前に確認してください
- 開発環境は検索エンジンインデックスを無効化しています。公開時にチェックを外すのを忘れないでください。
- 監視タスクはあえて入れていないため（browser-syncとchokidar自体は入っています）、各自の環境に合わせてカスタマイズしてください。

