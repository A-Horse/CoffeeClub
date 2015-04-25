(ns server-x.routes.article-services
  (:require [ring.util.http-response :refer :all]
            [compojure.api.sweet :refer :all]
            [schema.core :as s]))

(defapi service-routes
  (ring.swagger.ui/swagger-ui
   "swagger-ui")
  (swagger-docs
   :title "coffee article api, don't attack me, ok?")
  (swaggered "/article"
             :description "There be article api to operation!"
             (context "/article" []

                      )))
