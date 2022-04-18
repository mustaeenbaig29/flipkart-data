//page1
1.List of categories
2.List of products

//page2 
1.list of products on the basis of categories
2.Filter on the basis of cost
3.Filter on the basis of brand
4.Filter on the basis of customer rating

//page3
1.Product details

//page4
1.Details of product selected
(post)> http://localhost:7890/productDetails
(body)> [1,4,8]

2.place order
(post)> http://localhost:7890/placeorder
(body)>
{
        "_id": "625d37705ad18025f2d74a8d",
        "name": "saud",
        "email": "baigsaud56@gmail.com",
        "address": "R.t nagar ",
        "phone Number": 988908090,
        "status": "pending"
}

//page5
>>sell all order place
http://localhost:7890/vieworder

>Get order on the basis of email id
http://localhost:7890/vieworder?email=baigsaud56@gmail.com