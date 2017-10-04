export default {
  distribution: {
    title: 'AmlToken distribution event',
    heading: 'AmlToken distribution event',
    headingEnded: 'The previous distribution event finished on',
    ended: `<p>Join the <a href="https://t.me/AmlToken">AmlToken Telegram</a>,
      <a href="https://AmlToken.slack.com">AmlToken Slack</a> or follow the
      <a href="https://twitter.com/AmlTokenproject">AmlToken Twitter</a>
      to learn when the next event begins.`,
    instructions: `
<p>To participate in the distribution event:</p>

<ul>
  <li>Enter your AmlToken address below</li>
  <li>You&apos;ll receive a unique Bitcoin address to purchase SKY</li>
  <li>Send BTC to the address—you&apos;ll receive 1 SKY per 0.002 BTC</li>
  <li><strong>Only send a multiple of 0.002BTC. You must send at least 0.002BTC. SKY is sent in whole numbers; fractional SKY is not sent.</strong></li>
</ul>

<p>You can check the status of your order by entering your address and selecting <strong>Check status</strong>.</p>
<p>Each time you select <strong>Get Address</strong>, a new BTC address is generated. A single SKY address can have up to 5 BTC addresses assigned to it.</p>
    `,
    statusFor: 'Status for {skyAddress}',
    enterAddress: 'Enter AmlToken address',
    getAddress: 'Get address',
    checkStatus: 'Check status',
    loading: 'Loading...',
    btcAddress: 'BTC address',
    errors: {
      noSkyAddress: 'Please enter your SKY address.',
    },
    statuses: {
      waiting_deposit: '[tx-{id} {updated}] Waiting for BTC deposit.',
      waiting_send: '[tx-{id} {updated}] BTC deposit confirmed. AmlToken transaction is queued.',
      waiting_confirm: '[tx-{id} {updated}] AmlToken transaction sent.  Waiting to confirm.',
      done: '[tx-{id} {updated}] Completed. Check your AmlToken wallet.',
    },
  },
};
