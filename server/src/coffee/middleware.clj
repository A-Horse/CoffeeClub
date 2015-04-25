(ns coffee.middleware
  (:require [coffee.session :as session]
            [taoensso.timbre :as timbre]
            [environ.core :refer [env]]
            [selmer.middleware :refer [wrap-error-page]]
            [prone.middleware :refer [wrap-exceptions]]
            [ring.util.response :refer [redirect]]
            [ring.middleware.defaults :refer [site-defaults wrap-defaults]]
            [ring.middleware.session-timeout :refer [wrap-idle-session-timeout]]
            [noir-exception.core :refer [wrap-internal-error]]
            [ring.middleware.session.memory :refer [memory-store]]
            [ring.middleware.format :refer [wrap-restful-format]]
            [ring.middleware.anti-forgery :refer [wrap-anti-forgery]]
            ))

(defn log-request [handler]
  (fn [req]
    (timbre/debug req)
    (handler req)))

(defn wrap-csrf
  "disables CSRF for URIs that match the specified pattern"
  [handler pattern]
  (let [anti-forgery-handler (wrap-anti-forgery handler)]
    (fn [req]
      (if (re-matches pattern (:uri req))
        (handler req)
        (anti-forgery-handler req)))))

(defn development-middleware [handler]
  (if (env :dev)
    (-> handler
        log-request
        wrap-error-page
        wrap-exceptions)
    handler))

(defn production-middleware [handler]
  (-> handler
      
      (wrap-restful-format :formats [:json-kw :edn :transit-json :transit-msgpack])
      (wrap-idle-session-timeout
       {:timeout (* 60 30)
        :timeout-response (redirect "/")})
      (wrap-csrf #"^/user/.*")
      (wrap-defaults
       (->  site-defaults
            (assoc-in [:security :anti-forgery] false)
            (assoc-in [:session :store] (memory-store session/mem))))
      (wrap-internal-error :log #(timbre/error %))))
