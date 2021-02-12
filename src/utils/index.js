export function notify(titulo, mensagem) {
  
  if(!window.Notification) {
    console.log('Este browser não suporta Web Notifications!');
    return;
  }

  if (Notification.permission === 'default') {
    Notification.requestPermission(function() {
      console.log('Usuário não falou se quer ou não notificações. Logo, o requestPermission pede a permissão pra ele.');
    });
  } else if (Notification.permission === 'granted') {
    console.log('Usuário deu permissão');

    new Notification(titulo||"Status", {
     body: mensagem,
     tag: titulo+mensagem,
    });

  } else if (Notification.permission === 'denied') {
    console.log('Usuário não deu permissão');
  }
};
