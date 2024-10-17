FROM python:3.12-alpine
WORKDIR /back

COPY req.txt req.txt
RUN pip install -r req.txt

EXPOSE 80

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]