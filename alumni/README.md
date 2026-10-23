# Alumni profile uploads

This folder stores photos for alumni profiles shown on the Bhargav Public School website.

## Add a former student

1. Upload a photo into `alumni/photos/`.
2. Open `alumni/students.json` and add one object to the array.
3. Fill in the student's name, current occupation, year they passed out, and exact photo filename.
4. Commit the changes to the `main` branch. Cloudflare Pages should redeploy automatically.

Example:

```json
[
  {
    "name": "Aarav Sharma",
    "occupation": "Civil Engineer",
    "passingYear": 2018,
    "photo": "aarav-sharma.jpg"
  }
]
```

Use the actual details and filename. The example is illustrative only and is not a real alumni profile. Obtain consent before publishing students' names, occupations or photos, especially for people who are still minors. Do not add phone numbers or private contact details.
