from datetime import datetime, timedelta
import time
import tkinter as tk

# Define the action for the button
def on_click():
    print("Button was clicked!")
    
# 1. Create the main window
root = tk.Tk()
root.title("Pin Re-trigger App")
root.geometry("400x300") # Width x Height

# 2. Add a widget (Label)
label = tk.Label(root, text="Pin Re-trigger!")
label.pack() # Position the widget

# Create a button widget
# command=on_click connects the button to the function
button = tk.Button(root, text="Click Me", command=on_click)

# Display the button using a geometry manager (pack, grid, or place)
button.pack(pady=20)

current_date_us =  datetime.now()

import json
import requests
from datetime import timezone
from zoneinfo import ZoneInfo

SATURDAY = 0
friday_overrun = False;

print(current_date_us.weekday())

if(current_date_us.weekday() == SATURDAY) :
  # List runs in descending order by start time.
  job_id = "2586527"
  baseUrl = "https://deere-edl.cloud.databricks.com/api/2.0/jobs/runs/list?job_id=" + str(job_id) 
   
  #hex_external_token = ":".join("{:02x}".format(ord(c)) for c in external_token) 
  #print(hex_external_token)
  
  external_token = "64:61:70:69:37:36:38:61:38:38:66:35:63:30:66:62:31:64:62:35:31:39:32:31:62:35:63:30:30:38:34:65:38:62:35:38" 
 
  clean_hex = external_token.replace(":", "")
  readable_str = bytes.fromhex(clean_hex).decode('utf-8')
  print(readable_str)     
    
  try :
    # Set parameters
    json_data = json.loads('{"job_id": ' + job_id + '}')
    db_api_url = baseUrl
    db_headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {0}'.format(readable_str)
    }
    # Submit the job
    response = requests.get(db_api_url, headers=db_headers, json=json_data)
    if response.status_code == 200:    
      #print(response.json())
      job_detail = response.json()
      job_runs_detail = job_detail['runs']
      latest_run = job_runs_detail[0]
      #print(latest_run)
      last_run_id = latest_run['run_id']
      print("latest run Id ",last_run_id)
      latest_run_state = latest_run['state']['result_state']
      print("latest run state ",latest_run_state)
      notebook_parameters = latest_run['overriding_parameters']['notebook_params']
      print("notebook_parameters",notebook_parameters)
      latest_run_end_time = latest_run['end_time']
      print("latest_run_end_time",latest_run_end_time)
      latest_run_end_time = datetime.fromtimestamp(latest_run_end_time / 1000, tz=timezone.utc).astimezone(ZoneInfo("America/Chicago"))
      print("latest_run_end_time",latest_run_end_time)

      latest_run_duration = latest_run['execution_duration']
      print("latest_run_duration(mins)",latest_run_duration/1000/60)

      latest_run_start_time = latest_run['start_time']
      print("latest_run_start_time(UTC)",latest_run_start_time)
      latest_run_start_time = datetime.fromtimestamp(latest_run_start_time / 1000, tz=timezone.utc).astimezone(ZoneInfo("America/Chicago"))
      print("latest_run_start_time(CST)",latest_run_start_time)
      last_run_week_day = latest_run_start_time.weekday()
      print("Weekday ",last_run_week_day)
      print("Run hour",latest_run_start_time.hour)


  except Exception as e:
    print(e)

# 3. Start the event loop
root.mainloop()