# 開発構成概要（React + Hono + Zod + ElectroDB）

## 🔧 技術スタック

| 領域       | 使用技術                 | 備考                    |
| -------- | -------------------- | --------------------- |
| フロントエンド  | React + Vite         | 軽量なSPA構成              |
| APIサーバー  | Hono                 | 型安全で高速なエッジ対応フレームワーク   |
| スキーマ管理   | Zod                  | 入出力バリデーション & 型共有      |
| DBアクセス   | ElectroDB + DynamoDB | 型安全・設計指向のDynamoDBラッパー |
| 状態管理/API | TanStack Query       | APIフェッチとキャッシュ管理       |

## 📁 ディレクトリ構成（案）

```
apps/
├── web/                     # Reactアプリ
│   ├── src/
│   │   ├── features/         # ドメインごとのUIロジック（user, post等）
│   │   ├── lib/              # 共通ロジック（APIクライアントなど）
│   │   ├── hooks/            # TanStack Query用Hooks
│   │   └── main.tsx         # エントリポイント
├── api/                     # Hono APIサーバー
│   ├── routes/              # Honoルーティング（user.tsなど）
│   ├── entities/            # ElectroDBのEntity定義
│   └── db.ts                # ElectroDBクライアント生成ロジック
packages/
└── schema/                 # Zodスキーマと型定義の共有
```

## 🧠 設計思想

* **型安全の一貫性**：すべての入出力にZodを利用し、型情報を共有
* **APIとUIの疎結合**：Hono + TanStack Queryで役割分離
* **スキーマ一元管理**：ZodとElectroDBスキーマを統合的に管理
* **NoSQLベース設計**：pk/skを活かしたDynamoDBの正規設計（RDBライクに管理）

## ✅ 採用理由まとめ

* Prisma非対応なDynamoDBを使うため、ElectroDBを採用
* Zodベースの開発文化とElectroDBが相性良いため
* 型安全・開発体験を損なわない構成を目指す