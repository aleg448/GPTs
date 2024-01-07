import os
import sys
from app import application
# Add the app's directory to the PYTHONPATH
sys.path.insert(0, os.path.dirname(__file__))

  # Import the Flask app

# Ensure the application variable is named 'application'
# so Passenger can detect it
