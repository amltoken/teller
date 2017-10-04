export default {
  distribution: {
    title: 'Распространение AmlToken',
    heading: 'Распространение AmlToken',
    headingEnded: 'The previous distribution event finished on',
    ended: `<p>Join the <a href="https://t.me/AmlToken">AmlToken Telegram</a>,
      <a href="https://AmlToken.slack.com">AmlToken Slack</a> or follow the
      <a href="https://twitter.com/AmlTokenproject">AmlToken Twitter</a>
      to learn when the next event begins.`,
    instructions: `
<p>Что необходимо для участия в распространении:</p>

<ul>
  <li>Введите ваш AmlToken адрес</li>
  <li>Вы получите уникальный Bitcoin адрес для приобретения SKY</li>
  <li>Пошлите Bitcoin на полученый адрес: 1 SKY стоит 0.002 BTC</li>
</ul>

<p>Вы можете проверить статус заказа, введя адрес SKY и нажав на <strong>Проверить статус</strong>.</p>
<p>Каждый раз при нажатии на <strong>Получить адрес</strong>, генерируется новый BTC адрес. Один адрес SKY может иметь не более 5 BTC-адресов.</p>
    `,

    statusFor: 'Статус по {skyAddress}',
    enterAddress: 'Введите адрес AmlToken',
    getAddress: 'Получить адрес',
    checkStatus: 'Проверить статус',
    loading: 'Загрузка...',
    btcAddress: 'BTC адрес',
    errors: {
      noSkyAddress: 'Пожалуйста введите ваш SKY адрес.',
    },
    statuses: {
      waiting_deposit: '[tx-{id} {updated}] Ожидаем BTC депозит.',
      waiting_send: '[tx-{id} {updated}] BTC депозит подтверждён. AmlToken транзакция поставлена в очередь.',
      waiting_confirm: '[tx-{id} {updated}] AmlToken транзакция отправлена. Ожидаем подтверждение.',
      done: '[tx-{id} {updated}] Завершена. Проверьте ваш AmlToken кошелёк.',
    },
  },
};
