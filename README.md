# Ticket Exchange Microservices Application
Microservices application that simulates Stubhub's ability to do the following as a online voucher marketplace:

- Users may list event vouchers for sale, ticket prices may be editable.
- Other users may purchase these tickets.
- Tickets "lock" upon a user's attempt to purchase, giving the user a fixed amount of time to complete the purchase. During this time no other user may attempt to purchase the voucher.
- All purchases logic handled by Stripe.js

Built in TypeScript, Node, Express, React, MongoDB, Postre. Manged with Docker, Kubernetes and Ingress Nginx.

## Project Status: 15% Complete
_In active development_

## Project Roadmap
- [X] Kubernetes + Ingress Nginx deployment setup
- [X] `Auth Service` - Everything related to user signup/signin/signout. Talks to MongoDB db.
- [ ] Next.js client application
- [ ] `Ticket Service` - Ticket creation / editing. Keeps track of whether a ticket may be updated. Talks to MongoDB db.
- [ ] `Orders Service` - Order creation / editing. Talks to MongoDB db.
- [ ] `Expiration Service` - Watches for orders to be created, cancels after set amount of time. Talks to Redis db.
- [ ] `Payments Service` - Handles credit card payments. Cancels orders of payment fails, completes if successful. Talks to MongoDB db.
- [ ] [NATS Streaming Server](https://docs.nats.io/nats-concepts/jetstream) Event Bus

## Key Features
TBD

## Basic Usage
TBD
