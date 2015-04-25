(ns coffee.db.article
  (:require
   [coffee.db.core :refer [db]]
   [clojure.java.jdbc :as j]
   [honeysql.core :as sql]
   [honeysql.helpers :refer :all]))

(defn create-user [username password email admin]
  (j/insert! db (sql/format
                 (-> (insert-into :users)
                     (colums :username :password :email :admin)
                     (values
                      [username password email admin]))))
  )
