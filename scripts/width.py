for i in range(0,1):
  x=".W" + str(i) + " { width:"+str(float(i)/100)+"mm; }"
  print(x)

print("\nPadding Left\n")
for i in range(0,1):
    x=".L" + str(i) + " { padding-left:"+str(float(i)/100)+"mm; }"
    print(x)

print("\nHeight\n")
for i in range(0,1):
    height = round(float(300+i)/100,2)
    top = round(5-height,2)
    x=".H" + str(400+i) + " { height:6mm; padding-top:"+str(top)+"mm; }"
    print(x)


print("\nHeigh\n")
for i in range(0,1):
    height = round(float(1000+i)/1000,3)
    x=".H" + str(i) + " { height:"+str(height)+"em"+"; }"
    print(x)

print("\nPadding Left\n")
for i in range(0,1):
    x=".L" + str(i) + " { padding-left:"+str(float(i)/100)+"mm; }"
    print(x)
