# PCF_RadioButton

PCF Control for choices to display as radio button

Commands to publish
1) Create Solution folder
2) pac solution init --publisher-name NTIT --publisher-prefix NT
3) pac solution add-reference --path Path to main folder
To update Solution Name change cdsproj and 2 unique names in Solution.xml
4) msbuild /t:build /restore (If msbuild not avilable use visual studio command prompt)
5) msbuild /p:configuration=release
