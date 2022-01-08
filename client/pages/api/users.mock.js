// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      "_id": "61d7e145b7d681d1df81b2d1",
      "name": "Smith",
      "email": "Smith@email.com",
      "account": 200,
      "isMember": true,
      "pic": "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      "_id": "61d7e179b7d681d1df81b2d2",
      "name": "Ben",
      "email": "Ben@email.com",
      "account": 100,
      "isMember": true,
      "pic": "https://media.istockphoto.com/photos/put-more-in-get-more-out-picture-id1291318636?b=1&k=20&m=1291318636&s=170667a&w=0&h=UvVIk7wwkN3X9OFm8gBlWWviV5vAjfrq2ejYP30JmnA="
    },
    {
      "_id": "61d7e1d3b7d681d1df81b2d3",
      "name": "Jane",
      "email": "Jane@email.com",
      "account": 300,
      "isMember": true,
      "transactions": [
        {
          "id": 0,
          "item": {
              "name": "lamp",
              "price": 16.5,
              "quantity": 1,
          },
          "totalprice": 16.5,
        },
        {
          "id": 0,
          "item": {
              "name": "pencil",
              "price": 1.40,
              "quantity": 2,
          },
          "totalprice": 2.80,
        }
      ],
      "pic": "https://images.unsplash.com/photo-1530047139082-5435ca3c4614?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTYwfHxwZW9wbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    }
  ])
}
