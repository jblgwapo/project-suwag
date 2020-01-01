import os
import random

ROOT_PATH =  os.path.dirname(os.path.abspath(__file__))
#print(os.listdir(ROOT_PATH))
text= """Earlier in the day, we were left out to further troubleshoot the electric screw driver to found out that there are foreign materials within the gearbox. We believe that the said foreign materials are the waste product of the gears due to wear and tear. The drill was fixed but with inaccurate torque rating during the testing. Furthermore, the drills torque are offset by two units. We suggest to use the drill only when torque accuracy is not needed.

After we had fixed the drill, we immediately started to brainstorm about the penlights design. I even brought a reed switch for us to demonstrate our vision. Going into the details, we tried to focus on problems regarding the interchangeable LEDs and the degradation of switches along with the thought that it should also be user friendly.

On the afternoon we attended the quality meeting. Although we are only spectators, we had listened about the problems encountered during production and the precautions along with the plans on perfecting the quality of exported products. The production team also had a plan to improve the onboard instructions to further improve their way of work.

After which,  we had a torque test as a preparation for field work. We were tested using the M screw though we also tried M. The test was finished in no time and right after, we were given a specific task where I was appointed to design a conveyor or alike system that would ease the component flow of LAE units.

Earlier in the day, we were left out to further troubleshoot the electric screw driver to found out that there are foreign materials within the gearbox. We believe that the said foreign materials are the waste product of the gears due to wear and tear. The drill was fixed but with inaccurate torque rating during the testing. Furthermore, the drills torque are offset by two units. We suggest to use the drill only when torque accuracy is not needed.

After we had fixed the drill, we immediately started to brainstorm about the penlights design. I even brought a reed switch for us to demonstrate our vision. Going into the details, we tried to focus on problems regarding the interchangeable LEDs and the degradation of switches along with the thought that it should also be user friendly.

On the afternoon we attended the quality meeting. Although we are only spectators, we had listened about the problems encountered during production and the precautions along with the plans on perfecting the quality of exported products. The production team also had a plan to improve the onboard instructions to further improve their way of work.

After which,  we had a torque test as a preparation for field work. We were tested using the M screw though we also tried M. The test was finished in no time and right after, we were given a specific task where I was appointed to design a conveyor or alike system that would ease the component flow of LAE units.
    """
text = text.upper()
RESULT =''

#text = text.replace(' ', '~').splitlines()[0]





def decode(text):
    paragraph = text.splitlines()
    print(paragraph)
    for i in range(len(paragraph)):
        paragraph[i] = paragraph[i].split(' ')
    #print(paragraph)
    return paragraph


def save(text):
    result = '''<!DOCTYPE HTML>
    <html>
    <head><title>Automatic Lab reporting</title>
    <link id="style" rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>

    ''' + text + '</body></html>'
    save = open( ROOT_PATH + '/index.html', 'w+')
    save.write( result)
    save.close()
    print('Done!')


#print_page(decode(text))
#save(print_page(decode(text)))


def CreateLabReport(text):
    cache = text.upper()
    cache = cache.split('\n')

    print(cache)

    code=''
    for par in cache:
        par = par.split(' ')
        for word in par:
            code+='<div id="word">'
            for char in word:
                if char == '.':
                    char = 'dot'
                if char == '\n':
                    code= '<div endl></div>'

                target = ROOT_PATH + '/' + char + '/'
                font = char + '/' + random.choices(os.listdir(target))[0]
                #print(font)

                #margin = random.choices('top', 'bottom')
                width = int(random.choices(range(100, 500))[0])
                height = int(random.choices(range(14, 16))[0])
                renderWidth = '0.' + str(width)
                code += '<img src="' + font  + '" style="height:0.5cm; width=:' + str(renderWidth) + 'cm;">'
            code+='</div> '
        code+='<div endl></div>'
    save(code)



CreateLabReport(text)
