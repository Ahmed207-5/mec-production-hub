MEC Hub - Dynamic Departments / Admin Fix

Changes:
- Homepage department cards are now loaded from hub_nodes, so new active department nodes appear automatically.
- Existing Production and Power routes remain unchanged.
- New/custom departments open through /browse/{id} and can contain folders, batches, years, terms, links, and buttons.
- Admin parent selector now prioritizes department nodes and shows clearer hierarchy/path information.
- After creating or editing an item, the Admin list updates optimistically from the API response.
- Existing Google Drive URLs and Supabase data are not deleted or reseeded.

IMPORTANT:
- Do NOT rerun supabase/schema.sql on the existing database.
- Deploy this project normally.
- The existing custom department created from Admin should appear on the homepage if it is active.
