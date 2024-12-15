#!/bin/bash

# Remove @use statements and update variable references in all SASS files
find _sass -name "*.scss" -type f -exec sed -i '' \
  -e 's/@use ".*" as [a-z];//' \
  -e 's/[a-z]\.\$/$/' \
  {} +

echo "Updated all SASS files to use older syntax" 