FROM python:3.11.1

RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
WORKDIR /app

COPY ./entrypoint.sh .


CMD ["sh", "/app/entrypoint.sh"]