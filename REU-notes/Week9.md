# Backend Iteration

## Save Instances 

```
A4Solution nextInstance = currentInstance.next();
```

Here is the layout of this week's design:

```
Run
 ↓
Backend returns instances 0–4
 ↓
User navigates locally
 ↓
User reaches instance 4
 ↓
Request instances 5–9
```

The structure of the new response will follow something like this: 

```
{
  "satisfiable": true,
  "instances": [
    {
      "atoms": {
        "this/Person": ["Person$0"]
      },
      "relations": []
    },
    {
      "atoms": {
        "this/Person": ["Person$0", "Person$1"]
      },
      "relations": []
    }
  ]
  "instanceCount": 2,
  "limitReached": true
}
```
If there are no results the return JSON will be an object following this structure:

```
{
  "satisfiable": false,
  "instances": [],
  "instanceCount": 0,
  "limitReached": false
}
```

Revamped the frontend to match the results of the backend and also added more buttons to switch from the different instances!