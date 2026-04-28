import anthropic

client = anthropic.Anthropic()

while True:
    user_input = input("You: ")

    response = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=300,
        messages=[{"role": "user", "content": user_input}]
    )

    print("Claude:", response.content[0].text)

