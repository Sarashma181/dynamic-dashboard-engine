# Xpin AI Dynamic Dashboard Engine

A schema-driven dynamic dashboard application where dashboards are generated based on user prompts. The frontend dynamically renders different widgets based on the configuration received from the backend.

The architecture is designed to support AI-generated dashboards in the future by replacing the current keyword-based dashboard generator with an LLM-based service.

---

# Features Implemented

## 1. Dynamic Dashboard Generation

The application generates dashboards dynamically based on user prompts.

The user enters a prompt, and the backend analyzes the prompt and returns the required widget configuration.

Example prompts:

```
Show me analytics
```

Loads the default dashboard.

```
Show me sales analytics
```

Loads sales-related widgets.

```
Show me user management dashboard
```

Loads user management widgets.

```
Show me transaction analytics
```

Loads transaction-related widgets.

The frontend does not have hardcoded dashboard layouts. It renders widgets dynamically based on the backend response.

---

# Architecture

## Backend

Technology:

- FastAPI
- Python

Responsibilities:

- Receives dashboard generation prompts
- Generates widget configuration
- Handles widget actions
- Returns schema-driven JSON responses


## Frontend

Technology:

- React
- TypeScript
- Tailwind CSS
- React Query
- React Hook Form
- Zod Validation
- TanStack Virtual


Responsibilities:

- Fetch dashboard configuration
- Validate response schema
- Dynamically render widgets
- Handle widget interactions


---

# Dynamic Widget Engine

The dashboard is driven by widget configuration.

Supported widget types:

## Metric Card

Displays KPI information.

Example:

- Total Users
- Revenue
- Active Sessions


Configuration example:

```json
{
 "type":"METRIC_CARD",
 "title":"Total Users",
 "data":{
    "value":"12,450"
 }
}
```

---

## Chart Widget

Implemented using Recharts.

Supports:

- Dynamic chart title
- Dynamic data
- Responsive rendering


Example:

```json
{
 "type":"CHART",
 "title":"Revenue Trend",
 "data":[
    {
      "month":"Jan",
      "value":12000
    }
 ]
}
```

---

## Data Table Widget

The table component supports:

### Sorting

Implemented column-level sorting.

Users can click on table headers to sort data:

- Ascending order
- Descending order


### Filtering

Implemented search-based filtering.

Users can search using:

- ID
- Customer name
- Other row values


Example:

Searching:

```
Customer 10
```

returns matching records.

Searching:

```
10
```

matches records based on the configured filtering logic.


### Virtualized Rendering

The table uses TanStack Virtual.

Benefits:

- Efficient rendering of large datasets
- Improved performance
- Smooth scrolling with thousands of records


The table supports large datasets without rendering all rows into the DOM at once.

---

# Dynamic Form Widget

The form is generated dynamically from backend configuration.

Supported fields:

- Text
- Email
- Number
- Slider
- Toggle


Example fields:

```json
{
 "name":"firstName",
 "label":"First Name",
 "type":"text",
 "required":true
}
```

---

# Form Validation

Implemented using React Hook Form.

## Field Level Validation

### First Name

Validation:

- Required field validation


Example:

```
First Name is required
```


### Email

Validation:

- Required field validation
- Email format validation


### Age

Validation:

- Minimum value: 0
- Maximum value: 120


Additional protection:

Negative numbers are blocked.

Users cannot enter:

```
-10
```

or scientific notation:

```
e
```

---

# Form Submission Handling

Implemented widget action API integration.

Flow:

```
User submits form

        ↓

Frontend sends widget action request

        ↓

Backend processes action

        ↓

Success response returned

        ↓

Success message displayed
```


After successful submission:

```
User created successfully
```

message is displayed.


The message automatically disappears when:

- User starts typing again
- User changes any form input


---

# Prompt Based Dashboard Generation

The application supports prompt-driven dashboards.

Default prompt:

```
Show me analytics
```

loads the default dashboard.

Based on keywords, different dashboards are generated.

---

## Sales Analytics

Prompt:

```
Show me sales analytics
```


Returns:

- Total Sales metric
- Orders metric
- Monthly Sales chart


---

## User Analytics

Prompt:

```
Show me user analytics
```


Returns:

- Active Users metric
- User Growth chart
- Create User form


---

## Transaction Analytics

Prompt:

```
Show me transaction analytics
```


Returns:

- Transaction chart
- Transaction table


---

# Dashboard Schema Validation

The backend response is validated using Zod.

Benefits:

- Prevents invalid widget rendering
- Provides runtime safety
- Ensures frontend receives expected structure


Supported schema types:

- METRIC_CARD
- CHART
- TABLE
- DYNAMIC_FORM


---

# Error Handling

Implemented:

## Error Boundary

Prevents one failed widget from breaking the complete dashboard.

If a widget fails, an error message is displayed instead of crashing the application.


## API Error Handling

Handled using React Query mutation and query states.

States handled:

- Loading
- Success
- Error
- Refetching


---

# Loading Experience

Implemented skeleton UI.

While dashboard data is loading:

- Dashboard skeleton is displayed
- User gets immediate visual feedback


---

# Theme Support

Dashboard theme is controlled from backend configuration.

Currently supports:

- Dark theme
- Light theme compatible styling


Implemented using CSS variables and Tailwind dark mode classes.

---

# API Endpoints

## Generate Dashboard

```
POST /api/generate-dashboard
```


Request:

```json
{
 "prompt":"Show me sales analytics"
}
```


Response:

Returns dynamic widget configuration.

---

## Widget Action

```
POST /api/widget-action
```


Used for:

- Dynamic form submission
- Widget interactions


---

# Project Flow

```
User Prompt

      ↓

FastAPI Dashboard Generator

      ↓

Widget JSON Configuration

      ↓

Zod Schema Validation

      ↓

Dynamic Renderer

      ↓

React Widget Components

      ↓

User Interaction
```

---

# Future Improvements

The current implementation uses keyword-based prompt handling.

The architecture can be extended to use an AI model:

```
User Prompt

      ↓

LLM Service

      ↓

Generate Widget JSON

      ↓

Schema Validation

      ↓

Dynamic Dashboard Rendering
```

This allows fully AI-generated dashboards.

---

# Conclusion

This project demonstrates a reusable dynamic dashboard engine where UI components are driven completely by backend configuration.

The design allows new widgets, dashboards, and business domains to be added without modifying the core rendering engine.