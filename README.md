# PCF_RadioButton

PCF Control for choices to display as radio button

Commands to publish
1) Create Solution folder mkdir Solution
2) cd Solution
3) pac solution init --publisher-name NTIT --publisher-prefix NT
4) pac solution add-reference --path Path to main folder (If Path has space include path in '')
To update Solution Name change cdsproj and 2 unique names in Solution.xml
5) msbuild /t:build /restore (If msbuild not avilable use visual studio command prompt)
6) msbuild /p:configuration=release
