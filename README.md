# Compare your actual APR with Fluid’s displayed APR

Createad with Next.js and shadcn/ui.

## How it works

It is based on a workflow executed every hour by Github Actions.
The worklfow request current APY from Fluid API
The workflow is available on the folder .github/workflows

If you enter a wallet address and you click on Search, we request historical transactions to this wallet on Fluid API (the same API used for Fluid dashboard)

## Respect for privacy

You can clone the repository and launch it in local.
No data is collected.
No wallet connection is necessary.
