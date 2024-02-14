FROM python:3.11.1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/


COPY ./entrypoint.sh .



CMD ["sh", "/app/entrypoint.sh"]