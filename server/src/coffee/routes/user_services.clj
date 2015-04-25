(ns coffee.routes.user-services
  (:require
   [coffee.db.user :refer :all]
   [ring.util.http-response :refer :all]
   [compojure.api.sweet :refer :all]
   [schema.core :as s]))

(s/defschema User
  {:id Long
   :username String
   :email String
   :last_login String})

(defapi user-routes
  (ring.swagger.ui/swagger-ui
   "swagger-ui")
  (swagger-docs
   :title "coffee user api, it's very security")
  (swaggered "user"
             :description "There are user  api to operation!"
             (context "/user" []

                      (GET* "/alive" [] (ok {:ok "It's ok!"}) )

                      (POST* "/users" []
                             :return User
                             :body-params [user   User]
                             :summary "user register"
                             (ok create-user
                                 (:username user)
                                 (:password user)
                                 (:email user)
                                 (:admin user)
                                 ))
                      )))


