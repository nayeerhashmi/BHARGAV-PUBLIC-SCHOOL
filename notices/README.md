# School notices

This folder stores approved notices for the Bhargav Public School website.

## Publish a notice

1. Upload the PDF or image into `notices/files/`.
2. Open `notices/notices.json` and add an entry to the JSON array. Example:

```json
{
  "title": "Annual examination timetable",
  "date": "2026-11-05",
  "description": "Timetable for Classes 1 to 10.",
  "file": "/notices/files/annual-examination-timetable.pdf"
}
```

3. Commit the changes to `main` after reviewing them. Cloudflare Pages publishes the files after deployment completes.

The date is optional and should use YYYY-MM-DD. The file attachment is optional. Notices are shown on the website when the JSON entry is valid.

## Safety

- Publish only notices approved by the school.
- Do not upload private student information, marksheets, phone numbers, or confidential records.
- Public files in this repository can be viewed by anyone.
