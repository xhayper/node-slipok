<!-- markdownlint-disable -->
<div align="center">
    <br />
    <h3>node-slipok</h3>
    <br />
    <p>
        <a href="https://www.npmjs.com/package/slipok" target="_blank"><img src="https://img.shields.io/npm/v/slipok.svg" alt="npm version"/></a>
        <a href="https://github.com/xhayper/node-slipok/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/xhayper/node-slipok.svg" alt="license"/></a>
    </p>
</div>
<!-- markdownlint-enable -->

## About

`node-slipok` is a wrapper around SlipOK's API

## Example

```ts
import { Client } from "slipok";

const client = new Client("Branch ID", "API Key");

(async () => {
  console.log(
    await client.checkSlip(
      "0041000600000101030040220013071152533APM077365102TH91048134",
    ),
  );
})();
```

# LICENSE

SlipOK is a trademark of SLIPOK CO., LTD. We are not endorsed by or affiliated with SLIPOK.
