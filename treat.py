import json
import ast
import re

def transform_data(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    for book in data:
        if 'author' in book:
            author_cleaned = re.sub(r'\([^)]*\)', '', book['author'])
            authors = author_cleaned.split(',')
            book['authors'] = [author.strip() for author in authors]
            del book['author']

        list_fields = ['genres', 'characters', 'awards', 'ratingsByStars', 'setting']
        for field in list_fields:
            if field in book:
                try:
                    book[field] = ast.literal_eval(book[field])
                except ValueError:
                    print(f"Error parsing field {field} in book {book['bookId']}")

    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

input_file = 'dataset.json'
output_file = 'dataset_tratado.json'

transform_data(input_file, output_file)
