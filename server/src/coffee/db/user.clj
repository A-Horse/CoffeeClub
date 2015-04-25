(ns coffee.db.user
  (:require
   [coffee.db.core :refer [db]]
   [clojure.java.jdbc :as j]
   [honeysql.core :as sql]
   [honeysql.helpers :refer :all]))

(defn create-user [username password email admin]
  (j/insert! db
             (-> (insert-into :users)
                 (columns :username :password :email "admin")
                 (values
                  [username password email admin])
                 sql/format)))

