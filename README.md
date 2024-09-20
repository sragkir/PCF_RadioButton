# PCF_RadioButton

PCF Control for choices to display as radio button
Commands to publish
Create Solution folder
pac solution init --publisher-name NTIT --publisher-prefix NT
pac solution add-reference --path C:\Users\Sowmya\Desktop\Nomji\PCF_ADUser
To update Solution Name change cdsproj and 2 unique names in Solution.xml
msbuild /t:build /restore (If msbuild not avilable use visual studio command prompt)
msbuild /p:configuration=release
