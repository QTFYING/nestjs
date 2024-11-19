import pandas as pd
from sqlalchemy import create_engine

# 服务器数据库链接
server_engine = create_engine('mysql+pymysql://goStudy:12345678aa@121.4.86.16:3306/gostudy')

# 查询表数据，posts表
query = "SELECT * FROM posts"
df = pd.read_sql(query, server_engine)

# 本地数据库链接
local_engine = create_engine('mysql+pymysql://root:123456@127.0.0.1:3306/mydatabase')

# 将数据写入本地表，posts表
df.to_sql(name="posts", con=local_engine, if_exists='replace', index=False)