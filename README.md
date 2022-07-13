<p align="center">
  <a href="https://github.com/thiagosouf/projeto18-valex">
  </a>

  <h3 align="center">
    projeto18-valex
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/thiagosouf/projeto18-valex

$ cd projeto18-valex

$ npm install

$ npm run dev
```

API:

```
- POST /create (autenticada)
    - Rota para cadastrar um novo cartão
    - headers: {"x-api-key": "$apiKey"}
    - body: {
        "employeeId":1,
        "number":"0000 0000 0000 0000",
        "cardholderName": "Fulano Rubens da Silva",
        "password": "123",
        "isVirtual": false,
        "securityCode": "000",
        "originalCardId": null,
        "isBlocked": true,
        "type":"transport"
    }

- POST /activate
    - Rota para ativar o cartão
    - headers: {}
    - body: {
        "id":1,
        "securityCode":"000",
        "password":"123"
    }

- GET /balance
    - Rota para mostrar o saldo do cartão
    - headers: {}
    - body: {
        "id":1,
        "number":"0000 0000 0000 0000",
        "securityCode":"000",
        "password":"123"
    }

- POST /block
    - Rota para bloquear o cartão
    - headers: {}
    - body: {
        "id":1,
        "password":"123"
    }

- POST /desblock
    - Rota para desbloquear o cartão
    - headers: {}
    - body: {
        "id":1,
        "password":"123"
    }

- POST /payment
    - Rota para fazer pagamentos
    - headers: {}
    - body: {
        "cardId":1,
        "password":"123",
        "idBusinesses":5,
        "amount":123
    }

- POST /recharge (autenticada)
    - Rota para fazer recargas
    - headers: {"x-api-key": "$apiKey"}
    - body: {
        "cardId":1,
        "amount":123
    }

```
