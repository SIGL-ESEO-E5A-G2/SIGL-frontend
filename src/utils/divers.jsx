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

export function capitalize(text) {
  return text?.substring(0, 1)?.toUpperCase() + text?.substring(1, text?.length)?.toLowerCase();
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

export function getNomUser(user) {
  if (!user) return;

  const { nom, prenom } = user;
  return ((nom || "") + " " + (prenom || "")).trim();
}

export function addRow(row, setData) {
  setData(old => [row, ...old]);
}

export function removeRow(rowId, setData) {
  setData(old => {
    return [...old.filter(oldRow => oldRow.id !== rowId)];
  });
}

export function updateRow(row, setData) {
  setData(old => {
    const index = old.findIndex(oldRow => oldRow.id === row.id);

    if (index >= 0) {
      old[index] = {
        ...old[index],
        ...row,
      };

      return [...old];
    } else return old;
  });
}