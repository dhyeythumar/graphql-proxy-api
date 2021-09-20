<h1 align="center">GraphQL Proxy API</h1>

<h4 align="center">GraphQL Proxy API is wrapper around
    <a href="https://github.com/typicode/jsonplaceholder">
        JSON Placeholder
    </a>
    &bull;
    Simple fake GraphQL API for testing & prototyping
</h4>

## What’s In This Document

-   [Introduction](#introduction)
-   [Features](#features)
-   [Getting Started](#getting-started)
-   [Schema](./Schema.md)
-   [License](#license)
-   [Acknowledgements](#acknowledgements)

## Introduction

> **This project idea is heavily inspired by the JSON placeholder's idea of having a fake API.**
>
> Here check out the idealogy behind creating something like a JSON placeholder Restful APIs.

Most of the time when, trying a new library, hacking a prototype, or following a tutorial, I found myself in need of some data.

And I didn't like the idea of using some public API because I had the feeling that I was spending more time registering a client and understanding a complex API than focusing on my task.

But I liked the idea of image placeholders for web designers. So I decided to code a little Express server inspired by that and, here is [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## Features

-   No registration required
-   Zero configuration
-   Basic GraphQL API
-   "Has many" relationships ([check out schema](./Schema.md))
-   Filters and nested resources
-   Compatible with React, Angular, Vue, Ember, ...

## Getting Started

**You can use GraphQL's introspection feature to directly check out the available Queries & Mutations in Apollo's sandbox environment.**

-   Apollo sandbox link: https://studio.apollographql.com/sandbox/explorer
-   GraphQL Proxy API server link: https://graphql-proxy-api.vercel.app/

## License

Licensed under the [MIT License](./LICENSE).

## Acknowledgements

[JSON Placeholder](https://github.com/typicode/jsonplaceholder#readme)
