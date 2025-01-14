# Backend JR project

This project contains a Node Express Boilerplate. with some dependencies

The main focus of this home-project is to create an endpoint with the following characteristics:

## Route 

Implement the following route.
`POST /calculation/metric/top-2-boxes`

## Calculation. 

The calculation of the result MUST be a [Top 2 Boxes](https://help.qresearchsoftware.com/hc/en-us/articles/4418375534095-How-to-Compute-Top-2-Box-Scores) statistic calculation.

## Request

Required request body payload of the endpoint MUST follow the following structure. I.e.

```json
[
	{
		"participantId" : 2166342,
		"optionId" : 47081,
		"label" : "Definitivamente SÍ es para mí"
	},
	{
		"participantId" : 2166355,
		"optionId" : 47081,
		"label" : "Definitivamente SÍ es para mí"
	}
]
```

## Response

Required response structure

The response of the endpoint MUST follow the following structure. I.e.

```json
{
  "calculation": "top2boxes",
  "sampleSize": 300,
  "totalParticipants": 300,
  "score": 0.7034,
  "histogram": [
    {
      "optionId": 47081,
      "label": "Definitivamente SÍ es para mí",
      "order": 1,
      "frequencyCount": 53,
      "frequencyPercentage": 0.1766,
      "sampleSize": 300
    },
    {
      "optionId": 47081,
      "label": "Probablemente SÍ es para mí",
      "order": 2,
      "frequencyCount": 30,
      "frequencyPercentage": 0.10,
      "sampleSize": 300
    }
  ]
}
```
## Instructions

1. Please **fork this project** repository in a personal repository.
2. Implement the required endpoint and enjoy. **Please limit yourself to a timebox of 4hrs of work**.
3. **Notify us the result.** If the repository is private please invite us to check the solution.
4. **We will rate**, the code quality & structure, the requirements, and the calculations results.


## Project setup

1. Perform an `npm install`
2. To run the project just do a `node index.js`
