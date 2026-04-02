#!/usr/bin/env python3
"""
generate_flooring_light_oak.py

Generate a light oak hardwood flooring variation of the base kitchen image
using OpenAI's image generation API.
"""

import os
from pathlib import Path
from openai import OpenAI

def generate_flooring_image():
    """Generate the flooring variation image using OpenAI API"""

    # Check for API key
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not set")

    # Initialize OpenAI client
    client = OpenAI(api_key=api_key)

    # Define paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    output_path = project_root / "visualization-library" / "comparison" / "kitchen" / "flooring" / "light-oak" / "flooring_light-oak_01.png"

    # Create output directory if it doesn't exist
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Prompt for image generation
    prompt = """
    Same kitchen as base_kitchen_01.png.

    Keep EVERYTHING identical:
    - layout
    - camera angle
    - lighting
    - cabinets
    - island
    - appliances
    - walls
    - backsplash
    - ceiling

    ONLY change the flooring to light oak hardwood flooring with a natural matte finish, subtle wood grain, and medium-width planks.

    Do not modify any other elements.
    Maintain consistent lighting, geometry, and realism.
    """

    try:
        print("Generating flooring image with OpenAI API...")

        # Generate image
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt.strip(),
            size="1024x1024",
            quality="standard",
            n=1
        )

        # Get image URL
        image_url = response.data[0].url

        print("Image generated successfully. Downloading...")

        # Download the image
        import requests
        image_response = requests.get(image_url)
        image_response.raise_for_status()

        # Save the image
        with open(output_path, 'wb') as f:
            f.write(image_response.content)

        print(f"✅ Image saved successfully to: {output_path}")
        print(f"File size: {len(image_response.content)} bytes")

    except Exception as e:
        print(f"❌ Error: {e}")
        raise

if __name__ == "__main__":
    generate_flooring_image()