from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)



def sales_dashboard():

    return {

        "theme": "dark",

        "layout": "grid-3",

        "widgets": [

            {
                "type": "METRIC_CARD",
                "title": "Total Sales",
                "data": {
                    "value": "$120,000",
                    "trend": "+15%"
                }
            },


            {
                "type": "METRIC_CARD",
                "title": "Orders",
                "data": {
                    "value": "4,520"
                }
            },


            {
                "type": "CHART",
                "title": "Monthly Sales",

                "data": [

                    {
                        "month": "Jan",
                        "value": 20000
                    },

                    {
                        "month": "Feb",
                        "value": 30000
                    },

                    {
                        "month": "Mar",
                        "value": 25000
                    },

                    {
                        "month": "Apr",
                        "value": 45000
                    }

                ]

            }

        ]

    }





def user_dashboard():

    return {

        "theme": "dark",

        "layout": "grid-3",

        "widgets": [

            {
                "type": "METRIC_CARD",

                "title": "Active Users",

                "data": {
                    "value": "12,450"
                }

            },


            {
                "type": "CHART",

                "title": "User Growth",

                "data": [

                    {
                        "month": "Jan",
                        "value": 1000
                    },

                    {
                        "month": "Feb",
                        "value": 2000
                    },

                    {
                        "month": "Mar",
                        "value": 3500
                    }

                ]

            },


            {
                "type": "DYNAMIC_FORM",

                "title": "Create User",

                "fields": [

                    {
                        "name": "firstName",
                        "label": "First Name",
                        "type": "text",
                        "required": True
                    },


                    {
                        "name": "email",
                        "label": "Email",
                        "type": "email",
                        "required": True
                    },


                    {
                        "name": "age",
                        "label": "Age",
                        "type": "number",
                        "min": 0,
                        "max": 120
                    }

                ]

            }

        ]

    }





def transaction_dashboard():

    return {

        "theme": "dark",

        "layout": "grid-2",

        "widgets": [

            {
                "type": "CHART",

                "title": "Transaction Trend",

                "data": [

                    {
                        "month": "Jan",
                        "value": 5000
                    },

                    {
                        "month": "Feb",
                        "value": 8000
                    },

                    {
                        "month": "Mar",
                        "value": 12000
                    }

                ]

            },


            {

                "type": "TABLE",

                "title": "Transactions",

                "columns": [

                    "id",
                    "customer",
                    "amount",
                    "status"

                ],


                "rows": [

                    {
                        "id": i,

                        "customer": f"Customer {i}",

                        "amount": i * 100,

                        "status":
                            "Completed"
                            if i % 2 == 0
                            else "Pending"

                    }

                    for i in range(1,10001)

                ]

            }

        ]

    }





def default_dashboard():

    return {

        "theme": "dark",

        "layout": "grid-3",

        "widgets": [

            {
                "type": "METRIC_CARD",

                "title": "Total Users",

                "data": {
                    "value": "12,450",
                    "trend": "+12%"
                }

            },


            {
                "type": "METRIC_CARD",

                "title": "Revenue",

                "data": {
                    "value": "$85,000",
                    "trend": "+8%"
                }

            },


            {
                "type": "METRIC_CARD",

                "title": "Active Sessions",

                "data": {
                    "value": "3,240"
                }

            },


            {
                "type": "CHART",

                "title": "Revenue Trend",

                "data": [

                    {
                        "month": "Jan",
                        "value": 12000
                    },

                    {
                        "month": "Feb",
                        "value": 18000
                    },

                    {
                        "month": "Mar",
                        "value": 25000
                    },

                    {
                        "month": "Apr",
                        "value": 30000
                    },

                    {
                        "month": "May",
                        "value": 40000
                    }

                ]

            },


            {
                "type": "TABLE",

                "title": "Recent Transactions",

                "columns": [

                    "id",
                    "customer",
                    "amount",
                    "status"

                ],


                "rows": [

                    {
                        "id": i,

                        "customer": f"Customer {i}",

                        "amount": i * 100,

                        "status":
                            "Completed"
                            if i % 2 == 0
                            else "Pending"

                    }

                    for i in range(1,1001)

                ]

            },


            {
                "type": "DYNAMIC_FORM",

                "title": "Create User",

                "fields": [

                    {
                        "name": "firstName",
                        "label": "First Name",
                        "type": "text",
                        "required": True
                    },


                    {
                        "name": "email",
                        "label": "Email",
                        "type": "email",
                        "required": True
                    },


                    {
                        "name": "age",
                        "label": "Age",
                        "type": "number",
                        "required": False,
                        "min": 0,
                        "max": 120
                    }

                ]

            }

        ]

    }



@app.post("/api/generate-dashboard")
def generate_dashboard(payload: dict):

    prompt = payload.get(
        "prompt",
        ""
    ).lower()



    if "sales" in prompt:

        dashboard = sales_dashboard()



    elif "user" in prompt:

        dashboard = user_dashboard()



    elif "transaction" in prompt:

        dashboard = transaction_dashboard()



    else:

        dashboard = default_dashboard()



    print(
        "Prompt:",
        prompt
    )


    print(
        "Widget count:",
        len(dashboard["widgets"])
    )


    return dashboard

@app.post("/api/widget-action")
def widget_action(payload: dict):

    print("Widget action received:")
    print(payload)


    return {

        "success": True,

        "message": "User created successfully",

        "data": payload

    }