FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
WORKDIR /app

COPY ./entrypoint.sh .

CMD ["gunicorn", "user.wsgi:application", "--bind", "0.0.0.0:8000"]
