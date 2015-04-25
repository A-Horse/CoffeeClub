(ns coffee.db.core
  (:require
    [yesql.core :refer [defqueries]]
    [clojure.java.jdbc :as j]
    [honeysql.core :as sql]
    [honeysql.helpers :refer :all]))

(def db
  {:subprotocol "postgresql"
   :subname "//localhost:3306/coffee"
   :user "coffee"
   :password "coffee"})




