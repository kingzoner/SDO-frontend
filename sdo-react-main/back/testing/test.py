import builtins
import contextlib
import io
import threading
import time


class TeacherList:
    operations_in_math = ['+', '-', '/', '*', '=']

    def __init__(self, variables=None, formulas=None):
        self.variables = variables or dict()
        self.input_variables = []
        self.formulas_teacher = dict()
        self.formulas_student = dict()
        self.check = []

    def binding_variables(self, a, b):  # a - student variable, b - teacher variable
        buff = dict()
        for i in range(0, len(self.variables)):
            if b == list(self.variables.items())[i][1]:
                buff[a] = b
            else:
                buff[list(self.variables.items())[i][0]] = list(self.variables.items())[i][1]
        self.variables = buff

    def binding_formulas(self, a, b):  # a - student formula, b - teacher formula
        for i in range(0, len(self.formulas_teacher)):
            if b == list(self.formulas_teacher.items())[i][1]:
                self.formulas_student[i] = a

    def add_variable(self, a):
        flag = False
        for i in range(0, len(self.variables)):
            if a == self.variables[i]:
                flag = True
        if not flag:
            self.variables[len(self.variables)] = a

    def add_teacher_formula(self, a):
        buff = []
        for char1 in a:
            for char2 in self.operations_in_math:
                if char1 == char2:
                    buff.append(a[:a.find(char2)])
                    self.add_variable(a[:a.find(char2)])
                    buff.append(char2)
                    a = a[a.find(char2) + 1:]
        buff.append(a)
        self.add_variable(a)
        self.formulas_teacher[len(self.formulas_teacher)] = buff
        self.check.append(False)

    def add_student_formula(self, a):
        formula = []
        for char1 in a:
            for char2 in self.operations_in_math:
                if char1 == char2:
                    formula.append(a[:a.find(char2)])
                    formula.append(char2)
                    a = a[a.find(char2) + 1:]
        formula.append(a)
        for ind2 in range(0, len(self.formulas_teacher)):
            check = True
            if len(formula) != len(self.formulas_teacher[ind2]):
                check = False
            for ind1 in range(2, len(formula), 2):
                if ind1 % 2 == 0:
                    try:
                        if self.variables[formula[ind1]] != self.formulas_teacher[ind2][ind1]:
                            check = False
                    except KeyError:
                        check = False
                    except IndexError:
                        check = False
                else:
                    try:
                        if formula[ind1] != self.formulas[ind2][ind1]:
                            check = False
                    except IndexError:
                        check = False
            if check:
                self.binding_variables(formula[0], self.formulas_teacher[ind2][0])
                self.binding_formulas(formula, self.formulas_teacher[ind2])


def check_formulas(path_teacher_formula, path_input_variables, path_code):
    teacher_list = TeacherList()
    with open(path_teacher_formula) as f:
        for line in f:
            line = line.rstrip()
            teacher_list.add_teacher_formula(line)
    buff = dict()
    for i in range(1, len(teacher_list.variables) - 1):
        if teacher_list.variables[i] == 'a1':
            buff['a'] = teacher_list.variables[i]
        else:
            buff[i] = teacher_list.variables[i]

    with open(path_input_variables) as f:
        for line in f:
            line = line.rstrip()
            teacher_list.input_variables.append(line)

    with open(path_code) as f:
        input_count = 0
        for line in f:
            line = line.rstrip()
            if line.find('input()') > -1:
                char = line[:line.find('=')]
                teacher_list.binding_variables(char, teacher_list.input_variables[input_count])
                input_count = input_count + 1
            else:
                teacher_list.add_student_formula(line)

    res = ""
    for i in range(len(teacher_list.formulas_teacher)):
        if teacher_list.formulas_student.get(i, False):
            res += "".join(teacher_list.formulas_student[i]) + '\n'
    return res


def execute_code(file_path: str) -> tuple[str, float, int]:
    inputs: list[int] = [1, 2, 3]
    with open(file_path, 'r') as file:
        code = file.read()

    output = io.StringIO()
    start_time = time.time()

    def exec_code():
        try:
            with contextlib.redirect_stdout(output):
                if inputs:
                    input_iter = iter(inputs)
                    builtins.input = lambda: next(input_iter)
                exec(code)
        except Exception as e:
            output.write(f"Error executing code: {e}")

    thread = threading.Thread(target=exec_code)
    thread.start()
    thread.join(timeout=5)

    if thread.is_alive():
        output.write("Execution timed out.")
        thread.join()

    end_time = time.time()
    execution_time = round(end_time - start_time, 3)
    code_length = sum(1 for line in code.split('\n') if line.strip())
    result = output.getvalue()

    return result, execution_time, code_length


# main testing file
def check_file(path_teacher_formula, path_input_variables, path_code) -> tuple[str, str, float, int]:
    formulas_output = check_formulas(path_teacher_formula, path_input_variables, path_code)
    code_output, execution_time, code_length = execute_code(path_code)
    return formulas_output, code_output, execution_time, code_length
