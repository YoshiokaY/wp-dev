#!make
# WILLIENT専用 Makefile
# データベース操作用コマンド

# データベースをダンプ（WILLIENT専用設定）
dump:
	docker exec willient-mysql mysqldump --no-tablespaces -u wpuser -pwppassword wordpress | gzip > ./docker/mysql/db_dump/backup.sql.gz

# データベースをリストア（WILLIENT専用設定）
restore:
	@$(MAKE) confirmation
	gunzip < ./docker/mysql/db_dump/backup.sql.gz | docker exec -i willient-mysql mysql -u wpuser -pwppassword wordpress

# リストア実行確認
confirmation:
	@read -p "本当にデータベースを復元しますか? [y/N]: " ans && [ $${ans:-N} = y ] || (echo "復元処理をキャンセルしました。"; exit 1)
