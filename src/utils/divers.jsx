import { notifications } from "@mantine/notifications";
import { Check2, X } from "react-bootstrap-icons";

import { notifTimeoutLong, notifTimeoutShort } from "../data/constantes";

/**
 * Check if the object in paramater is a function
 *
 * @param {*} obj
 * @return {boolean}
 */
export function isFunc(obj) {
  return obj instanceof Function;
}

/**
 * Envoie une notification apres une fonction
 * 
 * @param {fn} asyncFunc 
 * @param {{title, message, messageSuccess, messageError}} notification 
 * @returns 
 */
export function withNotification(asyncFunc, notification) {
  const {
    title,
    message,
    messageSuccess,
    messageError,
  } = notification;

  const notifId = notifications.show({
    loading: true,
    title: title,
    message: message,
    autoClose: false,
    withCloseButton: false,
  });

  return asyncFunc()
    .then(() => notifications.update({
      id: notifId,
      color: 'green',
      message: messageSuccess,
      icon: <Check2 />,
      loading: false,
      autoClose: notifTimeoutShort,
      withCloseButton: true,
    }))
    .catch(() => notifications.update({
      id: notifId,
      color: 'red',
      message: messageError || "Une erreur est survenue",
      icon: <X />,
      loading: false,
      autoClose: notifTimeoutLong,
      withCloseButton: true,
    }));
}