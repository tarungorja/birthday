# Battery-AnalyticsaaS FastAPI Application

## Overview

This FastAPI application provides an API to fetch information about Battery-AnalyticsaaS.

## Installation

1. Clone the repository and checkout to the required branch:

    ```bash
    git clone https://dev.azure.com/EnergyIOT/Battery_Solution/_git/Battery-AnalyticsaaS
    ```

2. Create a virtual environment and activate it:

    ```bash
    python3 -m venv env

    .\/env/Scripts/activate  # Run this command in the directory where the virtual environment exists
    ```

3. Install the required dependencies:

    ```bash
    pip install -r requirements.txt  # Run this command in the directory where the requirements.txt exists
    ```

## Usage

1. Run the application:

    ```bash
    fastapi dev .\app\main.py  # Run this command in the directory where the app folder exists
    ```

2. The API will be available at `http://127.0.0.1:8000`.

3. The API Swagger documentation will be available at `http://127.0.0.1:8000/docs`.

4. In Swagger, use the "Authorize" button to enter the access token, which you can obtain from the `v1/user/login` API. This will allow you to access the APIs in Swagger.

## File Structure

-   **`.env`**: Contains secret variables such as JWT_SECRET, JWT_ALGORITHM, MONGO_DB_URL, BLOCKCHAIN_URL, and DATABASE_NAME.
-   **`models/`**: Contains machine learning models used for predictions.
-   **`.gitignore`**: Specifies files and folders to be excluded from version control.
-   **`app/`**: Contains all files related to APIs.
    -   **`assets/`**: Contains `jio-certificate-logo.png`, used for certificate generation.
    -   **`auth/`**:
        -   `jwt_handler.py`: Handles encoding and decoding of login credentials.
        -   `jwt_bearer.py`: Validates tokens and manages request sessions.
    -   **`config/`**:
        -   `log_config.py`: Manages logger functions.
    -   **`core/`**:
        -   `config.py`: Maintains collection names.
        -   `custom_exceptions.py`: Defines custom exceptions.
        -   `database.py`: Contains MongoDB query functions.
        -   `exceptions.py`: Handles general exceptions.
        -   `decorators.py`: Includes decorators such as `log_time_taken` (which logs time taken for API requests).
    -   **`data_validations/`**:
        -   **`example_responses/`**: Contains response examples for APIs.
        -   **`mappers/`**: Maps API responses before returning them.
        -   **`schemas/`**: Defines Pydantic models for request and response validation.
    -   **`index_files/`**:
        -   `exception_config.py`: Connects custom and general exceptions to the app.
        -   `middleware_config.py`: Manages custom and built-in middlewares and connects them to the app.
        -   `routes_config.py`: Includes all routes in the app.
    -   **`routers/`**: Contains API routers and controllers.
    -   **`services/`**: Contains service layer functions for API routers.
    -   **`utils/`**: Includes utility functions used throughout the application.
    -   **`main.py`**: Defines the FastAPI application instance.
    -   **`requirements.txt`**: Lists all required libraries and their versions.

## Creating New APIs

Follow these steps when creating a new API:

1. **Write Request and Response Schemas**:

    - Define the request and response schemas using Pydantic models.
    - Ensure that you do not duplicate schemas; check existing schemas before creating new ones.

2. **Specify Data Types and Return Types**:

    - Clearly mention the data types for every request parameter.
    - Specify return types for every function you write.

3. **Maintain Layered Structure**:

    - **Controller Layer**:
        - Write API request functions in the `routers/` folder.
    - **Service Layer**:
        - Implement the required functions in the `services/` folder that are called by the controller layer.
    - **Database Layer**:
        - Write MongoDB query functions in the `database.py` file that are used in the service layer.
    - **Validations Layer**:
        - Map responses using the respective schemas in the `data_validations/` folder before sending them to the controller layer from the service layer.

4. **Handle Exceptions**:

    - Ensure all exceptions are handled correctly where there is a scope for exceptions.
    - For request parameter exceptions, use custom middleware in the `middleware_config.py` file. Update the middleware if new parameters are added.

5. **Add Logging**:

    - Apply the `log_time_taken` decorator to every API function to log the time taken for requests.
    - Add logging where necessary to help with debugging errors.

6. **Add Example Responses**:

    - Include example responses for all APIs in the `example_responses/` folder within the `data_validations/` directory.

7. **Update Release Info**:
    - Update the Release Info in the UI with detailed explanations after all changes are made.
